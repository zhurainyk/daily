## 描述 
>>> 官方解释：当您想记录工作目录和索引的当前状态，但又想返回一个干净的工作目录时，请使用git stash。该命令将保存本地修改，并恢复工作目录以匹配头部提交。

stash 命令能够将还未 commit 的代码存起来，让你的工作目录变得干净。

## 应用场景
我猜你心里一定在想：为什么要变干净？

应用场景：某一天你正在 feature 分支开发新需求，突然产品经理跑过来说线上有bug，必须马上修复。而此时你的功能开发到一半，于是你急忙想切到 master 分支，然后你就会看到以下报错：
![报错例子](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68f81dbc24944538bf63d8530f62cc2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

因为当前有文件更改了，需要提交commit保持工作区干净才能切分支。由于情况紧急，你只有急忙 commit 上去，commit 信息也随便写了个“暂存代码”，于是该分支提交记录就留了一条黑历史...(真人真事，看过这种提交)

## 命令使用
如果你学会 stash，就不用那么狼狈了。你只需要：
```js

git stash
```

就这么简单，代码就被存起来了。

当你修复完线上问题，切回 feature 分支，想恢复代码也只需要
```js

git stash apply
```

## 相关命令

```sh
    # 保存当前未commit的代码
    git stash

    # 保存当前未commit的代码并添加备注
    git stash save "备注的内容"

    # 列出stash的所有记录
    git stash list

    # 删除stash的所有记录
    git stash clear

    # 应用最近一次的stash
    git stash apply

    # 应用最近一次的stash，随后删除该记录
    git stash pop

    # 删除最近的一次stash
    git stash drop

 
```

当有多条 stash，可以指定操作stash，首先使用stash list 列出所有记录：
```sh
    $ git stash list
    stash@{0}: WIP on ...
    stash@{1}: WIP on ...
    stash@{2}: On ...
```

应用第二条记录：
```sh 
$ git stash apply stash@{1}
```
pop，drop 同理。

## vscode 集成
stash 代码
![vscode代码案例](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0103778063f486fb6c92c957ba1e85b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

填写备注内容，也可以不填直接Enter
![备注例子](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0842ab387018439db5b7d02ea8db9c10~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

在STASHES菜单中可以看到保存的stash
![例子](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54a0c598a8ea4e4ea4d2ffdf6d05cd61~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)

先点击stash记录旁的小箭头，再点击 apply 或者 pop 都可恢复 stash
![例子](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12ced5f42b5f42efb31654855e53fe04~tplv-k3u1fbpfcp-zoom-in-crop-mark:1304:0:0:0.awebp)


## reset --soft
## 描述
>>> 完全不接触索引文件或工作树（但会像所有模式一样，将头部重置为）。这使您的所有更改的文件更改为“要提交的更改”。

回退你已提交的 commit，并将 commit 的修改内容放回到暂存区。
一般我们在使用 reset 命令时，git reset --hard 会被提及的比较多，它能让 commit 记录强制回溯到某一个节点。而 git reset --soft 的作用正如其名，--soft (柔软的) 除了回溯节点外，还会保留节点的修改内容。
## 应用场景
回溯节点，为什么要保留修改内容？
应用场景1：有时候手滑不小心把不该提交的内容 commit 了，这时想改回来，只能再 commit 一次，又多一条“黑历史”。
应用场景2：规范些的团队，一般对于 commit 的内容要求职责明确，颗粒度要细，便于后续出现问题排查。本来属于两块不同功能的修改，一起 commit 上去，这种就属于不规范。这次恰好又手滑了，一次性 commit 上去。

