import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { LOGOUT_NAME } from '../../constants/views.jsx';

export default class NavBar extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        view: PropTypes.string.isRequired,
        navItems: PropTypes.arrayOf(PropTypes.object).isRequired,
        options: PropTypes.arrayOf(PropTypes.object).isRequired,
        onLogout: PropTypes.func.isRequired
    };

    anchorItems(items) {
        const handleClick = (name) => {
            if (name === LOGOUT_NAME) {
                this.props.onLogout();
            }
        };

        return items.map((item, i) => {
            return (
                <MenuItem
                    key={i}
                    primaryText={item.name}
                    containerElement={<Link to={item.path} />}
                    onClick={() => handleClick(item.name)}
                />
            );
        });
    }

    render() {
        const { title, view, navItems, options } = this.props;

        return (
            <AppBar
                title={<span><b>{title + " | "}</b><i><small>{view}</small></i></span>}
                titleStyle={{textAlign: "center"}}
                iconElementLeft={
                    <IconMenu
                        iconButtonElement={<IconButton><MenuIcon color="white" /></IconButton>}
                        targetOrigin={{horizontal: "left", vertical: "top"}}
                        anchorOrigin={{horizontal: "left", vertical: "top"}}
                    >
                        {this.anchorItems(navItems)}
                    </IconMenu>
                }
                iconElementRight={
                    <IconMenu
                        iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                        targetOrigin={{horizontal: "right", vertical: "top"}}
                        anchorOrigin={{horizontal: "right", vertical: "top"}}
                    >
                        {this.anchorItems(options)}
                    </IconMenu>
                }
            />
        );
    }
}