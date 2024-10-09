import React from 'react'

export interface ILoopProps<X> {
    data: Array<X>,
    render: (item: X, index?: number) => JSX.Element
}

const LoopUtil = <X,>(props: ILoopProps<X>) => {
    return React.Children.toArray(props.data.map((item, index) => props.render(item, index)))
}

export default LoopUtil
