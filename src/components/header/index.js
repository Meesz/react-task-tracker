import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '../button'

export const Header = ({title, onAdd, showAddTask})  => {
  
  return (
    <header className='header'>
        <h1>{title}</h1>
        <Button text={showAddTask ? 'Close' : 'Add'} color={showAddTask ? 'red' : 'green'} onClick={onAdd}/>
    </header>
  )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}
