# 使用git的基本命令

### 一、建立

1、建立远程仓库

2、建立本地仓库

3、连接远程仓库

```
git remote add origin "连接地址"//引号要去除
```

### 二、使用【每天的操作流程】

1、拉取远程项目

```
git pull
```

2、创建每天使用的分支

```
git branch lyx    //【lyx是分支名字】
```

3、切换到我的分支

```
git checkout lyx    //【lyx是分支名字】
```

4、开始在我的分支【lyx】在做项目

### 三、每天的项目已经做完，准备上传git

1、推到暂存区

```
git add .      //一定要加点
```

2、commit下

```
git commit -m "描述信息"
```

【注意：先不要推送到远程】

3、先切换到master主分支

```
git checkout master
```

4、我的分支与主分支合并

```
git merge lyx
```

5、推送项目到远程仓库

```
git push -v origin master
```

### 四、补充

1、删除远程分支

```
git push origin :br   //【br是分支的名字】
```

2、下载依赖包

```
cnpm install
```

### 五、记得删除当天自己的分支，目的是为了保证每天拉取的内容都是最新的

```
git branch -d lyx    //【lyx是分支名称】
```















































































































































































































