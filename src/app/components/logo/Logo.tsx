import React, { FunctionComponent } from 'react';
import './Logo.scss'

type LogoProps = {
    className?: string,
}

const Logo: FunctionComponent<LogoProps> = ({ className }) =>
    <div id="logo" className={className}>
        <div id="brno">BRNO</div>
        <div id="trip">TRIP</div>
    </div>

export default Logo;