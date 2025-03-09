"use client"
import {motion} from "motion/react"
import {Reducer, useReducer, useRef} from "react";
import styles from './Carousel.module.css'

type CarouselState = {
  direction: 'left' | 'right';
  value: number;
}

function reducer(state: CarouselState, action: { type: string; }): CarouselState {
  switch (action.type) {
    case 'left': {
      return {
        direction: 'left' as const,
        value: (state.value - 1 + 3) % 3
      };
    }
    case 'right': {
      return {
        direction: 'right' as const,
        value: (state.value + 1) % 3
      };
    }
  }
  throw Error('Unknown action: ' + action.type);
}

function Carousel() {
  // 用于存储当前拖拽的最远距离（x 轴）
  const [state, dispatch] = useReducer<Reducer<CarouselState, { type: string; }>>(reducer, {
    direction: "right",
    value: 0
  })


  const farthestXRef = useRef(0);
  // 用于存储拖拽起点的 x 坐标
  const startXRef = useRef(0);

  const handleDrag = (_: PointerEvent, info: any) => {
    const currentX = info.point.x;

    // 如果是拖拽的起点（第一次触发 onDrag）
    if (!startXRef.current) {
      startXRef.current = currentX;
      farthestXRef.current = 0; // 初始化最远距离
    }

    // 计算相对于起点的拖拽距离
    const dragDistance = currentX - startXRef.current;

    // 更新最远距离
    if (Math.abs(dragDistance) >= farthestXRef.current) {
      farthestXRef.current = Math.abs(dragDistance);
    }
  };

  const handleDragEnd = (event: PointerEvent, info: any) => {
    const currentX = info.point.x;
    const dragDistance = currentX - startXRef.current;
    if (Math.abs(dragDistance) >= (farthestXRef.current - 5) && farthestXRef.current > 100) {
      dispatch({type: dragDistance > 0 ? 'left' : 'right'})
    }
    startXRef.current = 0;
  };


  const ChildList = [
    <div className={styles.card1} key={0}></div>,
    <div className={styles.card2} key={1}></div>,
    <div className={styles.card3} key={2}></div>
  ]

  return (
    <div className={styles.container}>
      <motion.div
        drag="x"
        dragConstraints={{left: 0, right: 0}}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        data-direction={state.direction}
      >
        {ChildList[state.value]}
      </motion.div>

      <div className={styles.processBar}>
        <div className={styles.item} data-active={state.value === 0}></div>
        <div className={styles.item} data-active={state.value === 1}></div>
        <div className={styles.item} data-active={state.value === 2}></div>
      </div>
    </div>
  )
}


export default Carousel;
