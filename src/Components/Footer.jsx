import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <footer className="footer mt-auto py-3 bg-light">
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <div className="col-md-4 d-flex align-items-center">
                <div><NavLink
                        to='/'
                        className='nav-link'
                    ><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/c_crop,w_1024,h_400,g_auto/v1706547648/Stadi/Mesa_de_trabajo_1transparent_ybzbrp.png" width={100 + "px"}></img></NavLink></div>
                    <span className="text-muted text-center">© 2024 Stadi</span>
                </div>

                <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                    <li className="ms-3"><a className="text-muted" href="#"><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/v1698380989/instagram_k6kvwv.png" className="bi" width="24" height="24"></img></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/v1698380989/tiktok_lqaupy.png" className="bi" width="24" height="24"></img></a></li>
                    <li className="ms-3"><a className="text-muted" href="#"><img src="https://res.cloudinary.com/dgxmqoyv4/image/upload/v1698380989/facebook_gpe1ov.png" className="bi" width="24" height="24"></img></a></li>
                </ul>
            </footer>
        </div>
    </footer>
    </>
  );
}

export default Footer;
