import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeIcon } from '../../../../assets/images';
import { closeSubOptions, selectTool } from '../../../../redux/Tools/toolsActions';
import "./_tool.scss";

interface IToolProps {
    option: ITool,
    showSubOptions: boolean,
}


export default function Tool({ option, showSubOptions }: IToolProps) {
    const dispatch = useDispatch();


    const changeSelectedTool = (tool: string) => {
        dispatch(selectTool({ tool }));
    }
    const hideSelectedTool = () => {
        dispatch(closeSubOptions());
    }

    function renderSubOptions(options: React.Component) {
        if (options && showSubOptions)
            return (
                <div className={"tool__sub-option"}>
                    <div className="tool__sub-option__hide">
                        <img src={closeIcon} alt="close" onClick={hideSelectedTool} />
                    </div>
                    <div>
                        {options}
                    </div>
                </div>
            )
    }
    return (
        <div>
            <div className="tool" onClick={() => changeSelectedTool(option.type)}>
                <img src={option.icon} alt={option.name} />
            </div>
            {renderSubOptions(option.options)}
        </div>
    )
}
