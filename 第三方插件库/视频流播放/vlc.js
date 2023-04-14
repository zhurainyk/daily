import got from 'got';
import { URL } from 'url';
  const VALID_RATIOS = [
    '1:1',
    '4:3',
    '5:4',
    '16:9',
    '16:10',
    '221:100',
    '235:100',
    '239:100',
];
  const MAX_DB = 20;
  const MIN_DB = -20;
 class Client {
    constructor(address, password, advanced) {
        const server = typeof address === 'string'
            ? new URL(address)
            : address;
        server.username = '';
        server.password = password;
        this.server = server;
        this.advanced = advanced || {};
    }
    /**
     * This sends commands to the HTTP server to control VLC. See the provided link for all the commands. For more
     * query options (provided in the second parameter) make each property equal a value.
     * @example
     * command("volume", ["val", "50%"])
     * @param {String} vlcCommand
     * @param {String[]} options
     * @returns {Promise<VLCStatus>}
     * @link https://github.com/videolan/vlc/blob/master/share/lua/http/requests/README.txt
     */
    async command(cmd, options = []) {
        const target = new URL(this.server.toString());
        target.pathname = '/requests/status.json';
        // Add query parameters
        target.searchParams.append('command', cmd);
        for (let i = 0, j = 1; j < options.length; i += 1, j += 1) {
            const key = options[0];
            const value = options[1];
            if (key && value) {
                target.searchParams.append(key, value);
            }
            else {
                break;
            }
        }
        return this.request(target);
    }
    /**
     * Returns status.json /requests/status.json
     * @returns {Promise<VLCStatus>}
     */
    getStatus() {
        const target = new URL(this.server.toString());
        target.pathname = '/requests/status.json';
        return this.request(target);
    }
    /**
     * Returns the playlist.json /requests/playlist.json
     * @return {Promise<VLCPlaylist>}
     */
    getPlaylist() {
        const target = new URL(this.server.toString());
        target.pathname = '/requests/playlist.json';
        return this.request(target);
    }
    /**
     * Add <uri> to playlist
     * @param {string} uri
     * @returns {Promise<VLCStatus>}
     */
    queue(uri) {
        return this.command('in_enqueue', ['input', uri]);
    }
    /**
     * Add subtitle to currently playing file
     * @param {string} uri
     * @returns {Promise<VLCStatus>}
     */
    addSubtitles(uri) {
        return this.command('addsubtitle', ['val', uri]);
    }
    /**
     * Play an item based on ID. If an ID isn't provided the last item will play.
     * @param {number|string} id
     * @returns {Promise<VLCStatus>}
     */
    resume(id) {
        const query = id === undefined ? undefined : ['id', id.toString()];
        return this.command('pl_play', query);
    }
    /**
     * Toggle pause
     * @returns {Promise<VLCStatus>}
     */
    pause() {
        return this.command('pl_pause');
    }
    /**
     * Resume playback
     * @returns {Promise<VLCStatus>}
     */
    forceResume() {
        return this.command('pl_forceresume');
    }
    /**
     * Pause playback
     * @returns {Promise<VLCStatus>}
     */
    forcePause() {
        return this.command('pl_forcepause');
    }
    /**
     * Stop playback
     * @returns {Promise<VLCStatus>}
     */
    stop() {
        return this.command('pl_stop');
    }
    /**
     * Play next item
     * @returns {Promise<VLCStatus>}
     */
    next() {
        return this.command('pl_next');
    }
    /**
     * Jump to previous item
     * @returns {Promise<VLCStatus>}
     */
    previous() {
        return this.command('pl_previous');
    }
    /**
     * Remove media based on ID. If an ID isn't provided it'll remove the current item
     * @param {string} id
     * @returns {Promise<VLCStatus>}
     */
    remove(id) {
        const query = id === undefined ? undefined : ['id', id];
        return this.command('pl_delete', query);
    }
    /**
     * Empty the playlist
     * @returns {Promise<VLCStatus>}
     */
    empty() {
        return this.command('pl_empty');
    }
    /**
     * Set audio delay
     * @param {number} seconds
     * @returns {Promise<VLCStatus>}
     */
    setDelay(seconds) {
        return this.command('audiodelay', ['val', seconds.toString()]);
    }
    /**
     * Set subtitle delay
     * @param {number} seconds
     * @returns {Promise<VLCStatus>}
     */
    setSubtitleDelay(seconds) {
        return this.command('subdelay', ['val', seconds.toString()]);
    }
    /**
     * Set playback rate it must be greater than zero
     * @param {number} newRate
     * @returns {Promise<VLCStatus>}
     */
    setRate(newRate) {
        if (newRate > 0) {
            return this.command('rate', ['val', newRate.toString()]);
        }
        throw new Error(`Expected new playback rate to be greater than zero, got: ${newRate}`);
    }
    /**
     * Set aspect ratio, Valid ratios:
     * 1:1 , 4:3 , 5:4 , 16:9 , 16:10 , 221:100 , 235:100 , 239:100
     * @param {number} newRatio
     * @returns {Promise<VLCStatus>}
     */
    aspectRatio(newRatio) {
        if (VALID_RATIOS.includes(newRatio)) {
            return this.command('aspectratio', ['val', newRatio]);
        }
        throw new Error(`Expected new aspect ratio to be one of: ${VALID_RATIOS}`);
    }
    /**
     * Sort the playlist based on mode and order
     * - 0 Id
     * - 1 Name
     * - 3 Author
     * - 5 Random
     * - 7 Track number
     * @param {number} mode
     * @param {number} order
     * @returns {Promise<VLCStatus>}
     */
    sort(mode, order) {
        return this.command('pl_sort', [
            'id', mode.toString(),
            'val', order.toString()
        ]);
    }
    /**
     * Random playback
     * @returns {Promise<VLCStatus>}
     */
    random() {
        return this.command('pl_random');
    }
    /**
     * Toggle repeat (current item)
     * @returns {Promise<VLCStatus>}
     */
    repeat() {
        return this.command('pl_repeat');
    }
    /**
     * Toggle loop (current playlist)
     * @returns {Promise<VLCStatus>}
     */
    loop() {
        return this.command('pl_loop');
    }
    /**
     * Toggle fullscreen
     * @returns {Promise<VLCStatus>}
     */
    fullscreen() {
        return this.command('fullscreen');
    }
    /**
     * Enable services discovery module
     * @param {string} val
     * @returns {Promise<VLCStatus>}
     */
    sdAdd(val) {
        return this.command('pl_sd_add', [`val=${val}`]);
    }
    /**
     * Disable services discovery module
     * @param {string} val
     * @returns {Promise<VLCStatus>}
     */
    sdRemove(val) {
        return this.command('pl_sd_remove', ['val', val]);
    }
    /**
     * Seek to provided value.
     * Acceptable forms: [+ or -][<int><H or h>:][<int><M or m or '>:][<int><nothing or S or s or ">]
     * or [+ or -]<int>%
     * @param {string|number} val
     * @returns {Promise<VLCStatus>}
     */
    seek(val) {
        return this.command('seek', ['val', val.toString()]);
    }
    /**
     * Sets the preamp value, must be >=-20 and <=20
     * @param {number} dB
     * @returns {Promise<VLCStatus>}
     */
    preamp(dB) {
        if (dB >= MIN_DB && dB <= MAX_DB) {
            return this.command('preamp', ['val', dB.toString()]);
        }
        throw new Error('Expected to new preamp value to be less than'
            + ` ${MIN_DB} and greater than ${MAX_DB}`);
    }
    /**
     * set the gain for a specific band, must be >=-20 and <=20
     * @param {string} band
     * @param {number} gain
     * @returns {Promise<VLCStatus>}
     */
    equalizer(band, gain) {
        if (gain >= MIN_DB && gain <= MAX_DB) {
            return this.command('equalizer', [
                'band', band,
                'val', gain.toString(),
            ]);
        }
        throw new Error('Expected gain value to be less than '
            + ` ${MIN_DB} and greater than ${MAX_DB}`);
    }
    /**
     * Toggle the equalizer
     * @param {boolean} on
     * @returns {Promise<VLCStatus>}
     */
    toggleEqualizer(on) {
        const val = on ? '1' : '0';
        return this.command('enableeq', ['val', val]);
    }
    /**
     * set the equalizer preset as per the id specified
     * @param {string|number} id
     * @returns {Promise<VLCStatus>}
     */
    setPreset(id) {
        return this.command('setpreset', ['val', id.toString()]);
    }
    /**
     * Select an item based on title
     * @param {string} title
     * @returns {Promise<VLCStatus>}
     */
    title(title) {
        return this.command('title', ['val', title]);
    }
    /**
     * Select an item based on chapter
     * @param {string} chapter
     * @returns {Promise<VLCStatus>}
     */
    chapter(chapter) {
        return this.command('chapter', ['val', chapter]);
    }
    /**
     * Select the audio track (use the number from the stream)
     * @param {number} id
     * @returns {Promise<VLCStatus>}
     */
    selAudioTrack(id) {
        return this.command('audio_track', ['val', id.toString()]);
    }
    /**
     * Select the video track (use the number from the stream)
     * @param {number} id
     * @returns {Promise<VLCStatus>}
     */
    selVideoTrack(id) {
        return this.command('video_track', ['val', id.toString()]);
    }
    /**
     * Select the subtitle track (use the number from the stream)
     * @param {number} id
     * @returns {Promise<VLCStatus>}
     */
    selSubtitleTrack(id) {
        return this.command('subtitle_track', ['val', id.toString()]);
    }
    /**
     * Set volume
     * @param {number|string} value
     * @returns {Promise<VLCStatus>}
     */
    setVolume(value) {
        return this.command('volume', ['val', value.toString()]);
    }
    async request(target) {
        const resp = got({ url: target, ...this.advanced });
        return resp.json();
    }
} 
