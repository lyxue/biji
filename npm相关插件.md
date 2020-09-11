1、表格插件 通过npm下载  @eatong/reactable

2、路由：react-router

3、rmc-picker/lib/Popup

4、rmc-picker

5、3  4配合使用

6、rc-swipeout  左滑出现操作按钮 import Swipeout from 'rc-swipeout';

```
实例：
const right = [
    {
        text: '编辑',
        onPress: () => this.editMaterial(material, index),
        style: {backgroundColor: '#FF7D00', color: 'white'}
    },{
        text: '删除',
        onPress: () => this.deleteMaterial(material, index),
        style: {backgroundColor: 'red', color: 'white'}
    }
];
    return (
        <Swipeout key={material.id + ''}
            right={right}
            autoClose={true}
        >
            <section className="material-item">

            </section>
        </Swipeout>
    )
```

