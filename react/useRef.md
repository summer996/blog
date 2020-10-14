```
const ShowMore = () => {
    const [count, setCount] = useState(0);
    const handleAlertclick = (count) => {
        setTimeout(() => {
            alert(`you clicke on: ${count}`)
        }, 3000);
    }

    return <div>
        <p>you click {count} times</p>
        <button onClick={() => {setCount(count + 1)}}>Click me</button>
        <button onClick={handleAlertclick}>show alert</button>
    </div>
}
```
- 当点击alert按钮后，在继续点击计数按钮，这时候alert的快照结果是，点击alert时，count的值，这是因为,当我们更新状态的时候，react会重新渲染组件，然后也会重新渲染handleAlertClick函数，然后handleAlertClick都有自己的count，所以当点击的时候就是当前的值

让代码实时的弹出当前的点击值
```
const ShowMore = () => {
  const [count, setCount] = useState(0);
  const currentCount = useRef();

  useEffect(() => {
    currentCount.current = count;
  })

  const handleAlertClick = () => {
     setTimeout(() => {
            alert(`you clicke on: ${urrentCount.current}`)
        }, 3000);
  }

  return <div>
        <p>you click {count} times</p>
        <button onClick={() => {setCount(count + 1)}}>Click me</button>
        <button onClick={handleAlertclick}>show alert</button>
    </div>
}
```

- useRef不仅可以用来管理domRef，还可以相当于this,可以存放任何变量
- useRef可以很好的解决闭包带来的不方便性，你可以在各种库中看到他的身影，值得注意的是，当useRef的内容发生变化时，你不会有感知，更改.current的属性不会导致重新呈现，因为他一直是个引用

- 在函数组件中，没有this来存放一些实例的变量，因此react建议使用useRef来存放一些会发生变化的值，useRef并不是单单为了dom的ref准备的，同时也是为了存放**组件的实例属性** 