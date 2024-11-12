import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.module.css'

export default function Footer() {
    return (
            <footer>
                <div>
                    <ul>
                        <li><Link to="">Privacy Policy</Link></li>
                        <li><Link to="">Terms of Service</Link></li>
                        <li><Link to="">FAQ</Link></li>
                    </ul>
                </div>



                <p style={{
                    marginRight: '20px',
                    marginLeft: '20px'
                }}>Email: hugeali3@gmail.com</p>
                <p>Phone: 966512345678</p>

                <div>
                    <ul>
                        <li><a href="https://x.com/"><img
                            src="https://play-lh.googleusercontent.com/XyI6Hyz9AFg7E_joVzX2zh6CpWm9B2DG2JuEz5meCFVm4-wTKTnHgqbmg62iFKe4Gzca=w480-h960"
                            alt="Twitter" /></a></li>
                        <li><a href="https://www.facebook.com/"><img
                            src="https://play-lh.googleusercontent.com/KCMTYuiTrKom4Vyf0G4foetVOwhKWzNbHWumV73IXexAIy5TTgZipL52WTt8ICL-oIo=s96"
                            alt="Facebook" /></a></li>
                        <li><a href="https://www.instagram.com/"><img
                            src="https://play-lh.googleusercontent.com/VRMWkE5p3CkWhJs6nv-9ZsLAs1QOg5ob1_3qg-rckwYW7yp1fMrYZqnEFpk0IoVP4LM=s96"
                            alt="Instagram" /></a></li>
                    </ul>
                </div>
            </footer>
    )
}
