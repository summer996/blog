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
