import React from 'react'

class FileTable extends React.Component {
    render() {
        const id = this.props.id;

        return (
            <div className="card hoverable" key={'FILETABLE'}>                        
                <div className="changeCursor card-content">
                    <span className="card-title center">{ 'FILES' }</span>
                    
                </div>
            </div>
        )
    }
}

export default FileTable