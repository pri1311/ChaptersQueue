import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import styles from "../styles/Header.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Header() {
    let navigate = useNavigate();
    const { name } = useSelector((state) => state.user.value);
    return (
        <Navbar
            collapseOnSelect
            expand="lg"
            className={`bg-body-tertiary ${styles.header}`}
        >
            <Navbar.Brand className={styles.headername} onClick={() => {
                            navigate("/");
                        }} >ChaptersQueue</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link
                        onClick={() => {
                            navigate("/mycourses");
                        }}
                    >
                        My Courses
                    </Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link eventKey={2}>
                        {name}
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
