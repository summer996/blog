import React, { useRef, useEffect, useState } from 'react';

import allAxios from '../axios'

import './wuxiangundong.less';

interface Data {
  title: string;
  content: string;
  id: number | string;
}

let itemSize: number = 100;
let pageSize = 10, pageNo = 1;

let Wuxiangundong = (props: any) => {
  let containerRef: any = useRef();
  let [screenHeight, setScreenHeight] = useState(
    document.documentElement.clientHeight || document.body.clientHeight
  );
  let [pageData, setPageData] = useState({
    visibleCount: Math.ceil(screenHeight / itemSize),
    startOffset: 0,
    start: 0,
    listData: [],
  });
  let [end, setEnd] = useState(pageData.start + pageData.visibleCount);
   //获取真实显示列表数据
  let [visibleData, setVisibleData] = useState<Data[]>([]);

  let listHeight = pageData.listData.length * itemSize;

  useEffect(() => {
    setScreenHeight(document.documentElement.clientHeight || document.body.clientHeight);
  }, [document.documentElement.clientHeight, document.body.clientHeight]);

  useEffect(() => {
    if (pageData?.listData?.length) {
      let visibleData = pageData?.listData?.slice(pageData.start, Math.min(end, pageData.listData.length));
      setVisibleData(visibleData);
    }
    
  }, [pageData.listData.length, pageData.start, end]);
 
  useEffect(() => {
    getTenListData();
  }, []);

  //偏移量对应的style
  let getTransform = () => {
    return `translate3d(0, ${pageData.startOffset}px, 0)`;
  };

  let getTenListData = async () => {
    let result = await allAxios.getDemoTable({ pageSize, pageNo: ++pageNo });
    let { data } = result.data;
    setPageData((preState: any) => {
      let { listData } = preState;
      return {
        ...preState,
        listData: [...listData, ...data]
      };
    });
  };

  const scrollToTop = () => {
    containerRef.current.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    })
  }

  const scrollEvent = (e: any) => {

    //当前滚动位置
    const scrollTop = containerRef.current.scrollTop;
    //此时开始的索引
    let start = Math.floor(scrollTop / itemSize);
    //此时结束的索引
    let end = start + pageData.visibleCount;
    //此时的偏移量
    let startOffset = scrollTop - (scrollTop % itemSize);

    end > pageData.listData.length && getTenListData();
    
    setEnd(end);
    setPageData((preState: any) => {
      return {
        ...preState,
        startOffset,
      };
    });
  };

  return (
    <div className="infinite-list-container" ref={containerRef} onScroll={scrollEvent}>
      {end > 20 && (
        <div className="scrollTopBtn" onClick={scrollToTop}>
          回到顶部
        </div>
      )}
      <div className="infinite-list-phantom" style={{ height: `${listHeight}px` }}></div>
      <div className="infinite-list" style={{ transform: getTransform() }}>
        {visibleData.map((item: any) => {
          return (
            <div
              className="infinite-list-item"
              key={item.demoId}
              style={{ height: `${itemSize}px`, lineHeight: `${itemSize}px` }}
            >
              <div className="left-section">{item?.name?.[0] || '无'}</div>
              <div className="right-section">
                <div className="title">{item.name}</div>
                <div className="desc">{item.copyright}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Wuxiangundong;


const ScrollImg = () => {
  let imgs = [
    'https://img2.baidu.com/it/u=3356250985,1065949047&fm=26&fmt=auto',
    'https://img2.baidu.com/it/u=1514002029,2035215441&fm=26&fmt=auto',
    'https://img2.baidu.com/it/u=1079411485,1922124194&fm=26&fmt=auto',
    'https://img2.baidu.com/it/u=3356250985,1065949047&fm=26&fmt=auto',
    'https://img2.baidu.com/it/u=2192265457,2884791613&fm=26&fmt=auto',
    "https://img2.baidu.com/it/u=3356250985,1065949047&fm=26&fmt=auto"
  ];

  const divRef: any = useRef();
  const [state, setState] = useState(imgs);
  useEffect(() => {
    const images = document.getElementsByClassName('imgs')
    divRef.current.addEventListener('scroll', () => { scrollEvent(images) });
  }, [])

  const scrollEvent = (images: any) => {
    // 可视区
    let clientHeight = divRef.current.clientHeight;
    // 滚动距离
    let scrollTop = divRef.current.scrollTop;
    for (let image of images) {
      //图片距离顶部距离
      let top = image.offsetTop;
      debugger;
      if (top < clientHeight + scrollTop) {
       // 设置图片源地址，完成目标图片加载
        image.src = image.dataset.src;;
      }
    }
  };

  return <div ref={divRef} style={{width: '130px', height: '200px', overflow: 'auto', marginTop: '20px'}}>
  {
    state.map((item, index) => {
      return <img className="imgs" crossOrigin="" style={{ width: '100px', height: '100px' }} data-src={ item } />
    })
  } 
  
</div>
}


const scrollTable = () => {
  let [state, setStates] = useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]);
  useEffect(() => {
    const images = document.getElementsByClassName('imgs')
    divRef.current.addEventListener('scroll', scrollEvent);
  }, [])

  const scrollEvent = async (e) => {
    //可视区高度
    let scrollHeight = e.target.scrollHeight;
    
     //滚动高度
     let scrollTop = e.target.scrollTop;
     //列表内容实际高度
     let offsetHeight = e.target.offsetHeight;
     if (offsetHeight + scrollTop >= scrollHeight) {
       let result = await loadData();
       setStates((preState: number[]) => {
        return [...preState, ...result]
       })
     }
  };

  const loadData = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve([1, 1, 1, 1, 1]);
      }, 1000);
    });
  };
  
  return <div ref={divRef} style={{width: '130px', height: '200px', overflow: 'auto', marginTop: '20px'}}>
  {list.map((item, index) => {
    return (
      <div style={{ width: '100px', height: '100px' }}>
        「{index}」
      </div>
    );
  })}
</div>

}