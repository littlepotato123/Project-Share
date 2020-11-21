import React from 'react';
import Authentication from '../../Components/Authentication/Auth';
import Categories from '../../Components/CategoryPage/CategoryPage';
import Leaderboard from '../../Pages/Leaderboard/Leaderboard';
import Trending from '../../Pages/Trending/Trending';

class Dropdown extends React.Component {
    constructor() {
        super();

        this.state = {
            displayMenu: false,
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);

    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: true }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: false }, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    render() {
        return (
            <div className="dropdown">
                <div className="DDbutton" onClick={this.showDropdownMenu}>Navigate</div>

                { this.state.display ? (
                    <ul>
                        <li> {Trending()} </li>
                        <li> {Leaderboard()} </li>
                        <li> {Categories()} </li>
                        <li> {Authentication()} </li>
                    </ul>
                ) :
                    (
                        null)
                }
            </div>
        );
    }
}

export default Dropdown;