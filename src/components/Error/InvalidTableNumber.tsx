import React from 'react';

const InvalidTableNumber: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1 style={{ color: 'red' }}>Error</h1>
            <p>The table number you entered is invalid.</p>
        </div>
    );
};

export default InvalidTableNumber;