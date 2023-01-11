 <template>
    <div>
        <div class="g-bg"></div>
        <div class="grid"></div>
        <div class="grid"></div>
        <div class="g-mountain"></div>
        <svg width="0">
            <filter id="filter">
                <feTurbulence id="turbulence" type="fractalNoise" baseFrequency=".03" numOctaves="20" />
                <feDisplacementMap in="SourceGraphic" scale="30" />
            </filter>
        </svg>
        <svg width="0">
            <filter id="filter2">
                <feTurbulence id="turbulence" type="fractalNoise" baseFrequency=".02" numOctaves="20" />
                <feDisplacementMap in="SourceGraphic" scale="30" />
            </filter>
        </svg>
    </div>
</template>

<script>
export default {

}
</script>

<style>
</style>