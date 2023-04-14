1. 首先git pull拉去最新的代码
2. git branch -a 查看代码分支 确认所在分支（可省略该步骤）
3. 先在All-> Merged目录下找到已经合并的最新代码记录 找到对应的commit信息作为标记 
4. git log 查看上一步对应commit id 并复制该id
5. git reset --soft 77377373dddf33  设置成该节点 //普通回退 不用加--soft
6. git add . 提交
7. git commit -am "update"
8. git log 查看commit信息是否成功
9. git push origin HEAD:refs/for/v2.0 

第二种情况：
当本地代码和远端仓库代码冲突了 无法使用git pull 的时候 

1. git stash 保存本地仓库的代码到cache中
2. git pull 拉去远端仓库的代码到本地仓库
3. git stash pop  恢复cache代码到本地仓库 然后检查并解决冲突 合并代码 git push