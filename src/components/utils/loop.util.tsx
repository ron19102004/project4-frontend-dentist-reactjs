import React from 'react'

export interface ILoopProps<X> {
    data: Array<X> | null | undefined,
    render: (item: X, index?: number) => JSX.Element
}

const LoopUtil = <X,>(props: ILoopProps<X>) => {
    if (!props.data) return;
    return React.Children.toArray(props.data.map((item, index) => props.render(item, index)))
}

export default LoopUtil
