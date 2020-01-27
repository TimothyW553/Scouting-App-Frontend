import React, { Component } from 'react';

class InMatchForm extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.checkZone = this.checkZone.bind(this);

        this.recordCycleStart = this.recordCycleStart.bind(this); // starts when match starts
        this.recordCycleEnd = this.recordCycleEnd.bind(this); // ends when 5 balls are scored

        this.recordClimbStart = this.recordClimbStart.bind(this);
        this.recordClimbEnd = this.recordClimbEnd.bind(this);

        this.loadMenu = this.loadMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.controlPanelMenu = this.controlPanelMenu.bind(this);

        let alliance = this.props.data.alliance;
        let side = this.props.data.blueSide;
        if((alliance === 'blue' && side === 'left')  ||
           (alliance === 'red'  && side === 'right')) {
               this.leftSide = true;
        } else if((alliance === 'blue' && side === 'right') ||
            (alliance === 'red'  && side === 'left')) {
                this.leftSide = false;
        } else {
            alliance = 'blue';
            this.leftSide = true;
            alert('The alliance was no properly set!');
        }
    }

}

export default InMatchForm;