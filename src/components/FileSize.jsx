const FileSize = ({ fileSize }) => {
  return (
    <div className="flex justify-center border-dashed border-2 p-auto items-center h-32">
        <p className="text-2xl flex  text-white font-bold">Size: {fileSize} bytes</p>
    </div>
  )
}

export default FileSize