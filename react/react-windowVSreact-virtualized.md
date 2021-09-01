### react-window与react-virtualized有何不同？

几年前， 我写了```react-window```。当时，我对```React```和```windowing窗口```的概念都不熟悉。正因如此，我做了一些API决定，后来我后悔了。其中之一就是添加了太多非必须的功能和组件。一旦你向一个开源项目添加了一些东西，然后再删除，对于用户来说非常痛苦。

```react-window```是对```react-virtualized```的完全重写。我没有尝试解决太多的问题或者支持更多的使用例子。相反，我更关注于使包更小和更快。我还花了很多心思使API和文档尽可能适合初学者（但仍然要注意，窗口仍然是一种高级用例）。

如果react-window提供了你项目所需的功能，我强烈推荐你使用```react-window```而不是```react-virtualized```。但是如果你只需要```react-virtualized```提供的功能，你可以有两种选择：
- 使用```react-virtualized```，它仍然被许多成功的项目广泛使用
- 创建一个组件来装饰一个 react-window 原语并添加您需要的功能。您甚至可能希望将此组件发布到 NPM（作为它自己的独立包）！