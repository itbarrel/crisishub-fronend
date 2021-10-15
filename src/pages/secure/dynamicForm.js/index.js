import React, { memo } from 'react'
import withLayout from "../../../layouts/app-layout";
import Widget from "../../../components/Widget";
import CreateForm from "../../../components/resources/dynamicForm/create-form";


const DynamicForm  = memo(() => {
  return (
    <>
      <Widget title="create.form">
        <CreateForm />
      </Widget>
    </>
  )
})

DynamicForm.displayName = DynamicForm

export default withLayout(DynamicForm) 
