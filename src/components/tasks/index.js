import React from "react"
import PropTypes from 'prop-types'
import { Task } from "./Task"

export const Tasks = ({tasks, onDelete, onToggle}) => {
  return (
    <>
    {tasks.map((task) => (
        <Task task={task} key={task.id} onDelete={onDelete} onToggle={onToggle}/>
    ))}
    </>
  )
}

Task.propTypes = {
    tasks: PropTypes.array,
}

