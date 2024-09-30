import { ReactFlow, Background, Controls } from '@xyflow/react'
import axios from 'axios'


const Flow = () => {
    return (
        <div className='w-full h-screen border-gray-300'>
            <ReactFlow>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    )
}

export default Flow