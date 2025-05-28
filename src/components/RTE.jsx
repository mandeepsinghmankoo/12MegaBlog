import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({ name, control, label }) {
    return (
        <div className='w-full'>
            {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        menubar={true}
                        initialValue="Welcome to TinyMCE!"
                        apiKey='9et8f0b81j3nl9zmitk0vudouivourh2hc4nwp4a4g13art0'
                        init={{
                            height: 500,
                            menubar: false,
                            plugins: 'advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount',
                            toolbar:
                                'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | customPrint | help',
                            setup: function (editor) {
                                editor.ui.registry.addButton('customPrint', {
                                    text: 'Print',
                                    onAction: function () {
                                        editor.getWin().print();
                                    }
                                });
                            },
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                        }}
                        onEditorChange={(content) => onChange(content)}
                    />
                )}
            />
        </div>
    )
}

export default RTE
