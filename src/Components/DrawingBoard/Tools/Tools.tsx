import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PenIcon, SelectionIcon, EraserIcon, ShapesIcon, UploadIcon, closeIcon } from '../../../assets/images';
import { ERASER_TOOL, PENCIL_TOOL, SELECTION_TOOL, SHAPES_TOOL, UPLOAD_TOOL } from '../../../Constants/tools';
import { changePencilColor, changePencilThickness } from '../../../redux/PencilTool/PencilToolActions';
import { closeSubOptions, selectTool } from '../../../redux/Tools/toolsActions';
import PencilOption from '../PencilTool';
import Tool from './Tool/Tool';
import "./_tools.scss";
export interface IToolsProps {

}



const generateOptions = (changeColor: (color: string) => void, changeThickness:(thickness: number) => void) : ITool[] => (
  [
    {
      name: "selection",
      icon: SelectionIcon,
      type: SELECTION_TOOL,
    },
    {
      name: "Pen",
      icon: PenIcon,
      type: PENCIL_TOOL,
      options: <PencilOption changeColor={changeColor} changeThickness={changeThickness} />,

    },
    {
      name: "eraser",
      icon: EraserIcon,
      type: ERASER_TOOL,
    },
    {
      name: "shapes",
      icon: ShapesIcon,
      type: SHAPES_TOOL,
    },
    {
      name: "upload",
      icon: UploadIcon,
      type: UPLOAD_TOOL,
    }
  ]
)

export default function Tools(props: IToolsProps) {
  const dispatch = useDispatch();
  const { selectedTool, showSubOptions } = useSelector((state: IApplcationState) => state.tools)

  function changeColor(color: string) {
    dispatch(changePencilColor({ color }))
  }

  function changeThickness(thickness: number) {
    dispatch(changePencilThickness({ thickness }))
  }

  function renderIcons() {
    return generateOptions(changeColor,changeThickness).map((option: ITool) => (
      <Tool
        option={option}
        showSubOptions={selectedTool === option.type && showSubOptions}
      />
    ))
  }
  return (
    <div className="tools">
      {renderIcons()}
    </div>
  );
}
