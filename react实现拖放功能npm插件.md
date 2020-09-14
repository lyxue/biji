1、通过npm下载 react-sortable-hoc

```
npm install react-sortable-hoc --save
```

2、实例

```
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      classList: arrayMove(this.state.classList, oldIndex, newIndex),
    });
  };

renderItems() {
    const SortItem = SortableElement(({value}) => {
        return (
          <div className="ag-table-sort-item" key={value.index}>
            <div className='label'>
              <span className='name'>{value.type_name}</span>
            </div>
          </div>
        )
      }
    );
    const SortableList = SortableContainer(({items}) => {
      return (
        <div className="sort-list">
          {items.map((value, index) => (
            <SortItem key={`item-${index}`} value={{...value, index}} index={index}/>
          ))}
        </div>
      );
    });
    return (
      <SortableList
        items={this.state.classList}
        lockToContainerEdges
        lockAxis='y'
        onSortEnd={this.onSortEnd.bind(this)}
        distance={10}
      />
    );
  }

```

