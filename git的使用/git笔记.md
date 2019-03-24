## git的基本使用方法

### 一、安装与配置

1、下载与安装

​      下载地址：<https://git-for-windows.github.io>

- 配置个人信息（名字与邮箱）
  使用Git的第一件事就是设置你的名字和email,这些就是你在提交commit时的签名

  ```
  git config --global user.name "Your Name"   		 设置你的名字
  git config --global user.email "email@example.com"   设置你的email
  ```

  查看是否配置成功，用命名git config -l

  显示：【说明配置成功】

![](C:\Users\吕运学\Desktop\git的使用\img\git的配置.png)

### 二、创建本地仓库

##### 1、创建本地仓库

​	（1）、git init：把当前目录变成一个git仓库，并自动创建master分支

​	（2）、以上命令会在当前目录下创建了一个.git 隐藏目录，它就是所谓的Git 仓库。生成仓库后的目录就不是普通的文档目录了，我们将其称为工作区，所以工作区中都包含一个git仓库，而一个git仓库中又包含一个暂存区和一个版本库

​	（3）、一个git仓库中又包含一个暂存区和一个版本库

![](C:\Users\吕运学\Desktop\git的使用\img\工作区，暂存区，版本库.png)

##### 2、添加文件到版本库的步骤

​	（1）、创建文件【往工作区添加/修改文件】

​	（2）、过滤不想上传的文件

​		1》、在编辑器里边新建文件.gitignore,然后编辑不想上传的文件

![](C:\Users\吕运学\Desktop\git的使用\img\过滤文件里的实例.png)

​	（3）、添加到暂存区git add <文件，如是添加某个文件下的东西>

![](C:\Users\吕运学\Desktop\git的使用\img\提交文件到暂存区.png)

​      （4）、提交到版本库：`git commit -m "备注"` 

​		使用git commit 命令可将暂存区的内容提交至版本库中，这个过程称为提交，每一次提交都意味着版本在进行一次更新（会自动生成一个commit id） 

##### 	注意：如果不写-m回车会进入vim编辑界面，退出方法： 

- 进入编辑状态：i
- 退出编辑状态：ESC
- 同时按下Shift和冒号（:），接着输入输入：q（退出不保存），wq（保存并退出）

##### 3、其他辅助命令

- 查看仓库变更状态：`git status`
  用status查看仓库会有几种状态：untracked、unstaged、uncommitted 
  ![仓库变更状态]()

##### 4、提交的状态

![](C:\Users\吕运学\Desktop\git的使用\img\几种提交的状态.png)

### 三、创建远程仓库

##### 1、关联本地仓库与远程仓库

方式1：适用于先有本地仓库，后有远程仓库的情况

格式：

```
git remote add 远程仓库名 远程仓库地址
```

```
git remote add origin git@github.com:xxx/view.git
```

测试是否成功`git remote -v`

PS：删除远程仓库连接：`git remote remove 远程仓库名`



方式2：克隆（适用于先有远程库，后有本地仓库的情况）

格式：

```
git clone 远程仓库地址
```

当你从远程仓库克隆时，实际上Git自动把本地的master分支和远程的master分支对应起来了，并且，远程仓库的默认名称是origin

##### 2、推送到远程仓库

git push 格式：`git push 远程仓库名 本地分支名:远程分支名` 把本地分支内容推送到远程分支（远程分支名省略表示推送到与本地分支相同的分支） 

```
git push origin master
```

##### 注意：

如果远程仓库内容跟本地仓库内容不一致时，先拉取远程仓库内容，拉取成功后 ，就可以推送到远程仓库了

##### 3、拉取与合并【同步本地与远程仓库 】

​	（1）、git pull 格式：`git pull 远程仓库名 远程分支名:本地分支名` 拉取远程分支内容到本地并与本地分支进行合并（本地分支名省略表示合并到与远程分支名相同的分支） 

```
git pull origin master
```

​	（2）、git pull的时候,提示fatal: refusing to merge unrelated histories 

解决方法:`git pull origin master --allow-unrelated-histories`

​	（3）、git fetch 拉取远程分支内容【跟git pull一样】

​	（4）、git merge 合并分支内容

```
git pull origin master

//以上命令相当与以下命令等效
git fetch origin master
git merge origin/master
```

##### 注意：

​	**push和pull后的分支顺序格式：<来源地>:<目的地>

##### 4、如果拉取有问题【拉不下来】

![](C:\Users\吕运学\Desktop\git的使用\img\如果拉取时出现问题.png)

##### 5、整个上传基本过程

![](C:\Users\吕运学\Desktop\git的使用\img\提交到远程仓库的基本操作.png)



##### 6、例子，不提交依赖包node_modules的处理办法

（1）、在文件.gitignore里处理不提交

（2）、首先下载package.json、【npm init】

（3）、在包的文件下dependencies下就包含了所有依赖包的名字，提交这个package.json到远程仓库即可，

（4）、在克隆的项目下，有需要下载依赖包，这个时候只需要执行【npm install】即可，所有的以来包将会全部下载，【就可以运行了】

##### 6、包的存放位置

![](C:\Users\吕运学\Desktop\git的使用\img\两个包存放处.png)

##### 解释：![](C:\Users\吕运学\Desktop\git的使用\img\对包存放何处意义的解释.png)

### 四、版本回退

1、回退命令：`git reset` 

- 回退到上一个版本
  `git reset --hard HEAD^`

- 回退到指定版本：
  `git reset --hard [commit id]` 版本号没必要写全，前几位就可以了，Git会自动去找。

- 回退指定文件
  `git reset --hard [commit id] <file>`

- 参数说明

- –hard:工作区、暂存区、版本库的文件同时回退

- –mixed：暂存区、版本库的文件回退（默认）

- –soft：仅仅回退版本库中的文件

  

- 当前版本：HEAD
  上一个版本：HEAD^
  上上个版本：HEAD^^
  … 依此类推
  前100个版本：HEAD~100
- 显示从最近到最远的提交日志：`git log`
  - –pretty=oneline（显示简要信息id+备注）
  - –graph（图形显示版本走向）
  - –abbrev-commit（显示简写的id）
  - 一大串类似3628164…882e1e0的是commit id（版本号）



- 查看命令历史：`git reflog`
- 撤销文件修改
  - `git checkout -- <file>`：放弃工作区的修改
  - `git rm --cache <file>`：撤销暂存区的修改
  - `git reset HEAD <file>`：撤销暂存区的修改

对比文件：`git diff <file>` 

##### 2、合并分支

![](C:\Users\吕运学\Desktop\git的使用\img\合并分支.png)