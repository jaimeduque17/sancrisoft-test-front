import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({title = "Titulo", description = "Descripción", children, className}) => {
    return (  
        <>
            <Menu />
            <div className="jumbotron">
                <h2>{title}</h2>
                <p className="lead">{description}</p>
            </div>
            <div className={className}>{children}</div>
        </>
    );
}
 
export default Layout;