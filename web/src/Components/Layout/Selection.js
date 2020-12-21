import React, { useState } from 'react';
import { layouts } from '../../Tools';
import LayoutComponent from './LayoutComponent';

const Selection = () => {
    const [layout, setLayout] = useState(sessionStorage.getItem('layout'));

    return (
        <div>
            {
                layouts.map(layout => {
                    return <LayoutComponent
                        id={layout.id}
                        title={layout.title}
                        info={layout.information}
                    />
                })
            }
        </div>
    )
}

export default Selection;