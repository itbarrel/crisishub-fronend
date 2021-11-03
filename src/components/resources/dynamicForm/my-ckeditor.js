import React, { memo, useRef, useState } from "react";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const MyCKEditor = memo(() => {

  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const { CKEditor, ClassicEditor } = editorRef.current || {}

  return (
    <>
      My Ck editor
    </>
  )
})

MyCKEditor.displayName = MyCKEditor

export default MyCKEditor
