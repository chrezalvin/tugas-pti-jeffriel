import { Component } from "react";
import { type ReactNode } from "react";

import { Link } from "react-router-dom";

import defaultAvatar from "../assets/default-avatar.svg";

interface Creator{
    nama: string,
    tugas: string[],
    deskripsi: string,
    imgUrl?: string
}

interface AboutUsProp{
    data_creator: Creator[];
}

interface AboutUsState{

}

class AboutUs extends Component<AboutUsProp, AboutUsState> {
    constructor(prop: AboutUsProp){
        super(prop);
    }

    render(): ReactNode {
        const creators = this.props.data_creator.map(creator => {
            return (
            <div className="row gap-4 mx-4" style={{height: "50vh"}}>
                <div className="col-4 d-flex justify-content-center" id="picture-0">
                    <img 
                        src={creator.imgUrl ?? defaultAvatar} 
                        className="align-self-center" 
                        style={{height: "40vh"}}
                        alt={creator.nama}
                        />
                </div>
                <div className="col-7 overflow-auto">
                    <table className="table table-borderless">
                        <tr>
                            <td>nama:</td>
                            <td>{creator.nama}</td>
                        </tr>
                        <tr>
                            <td>Tugas:</td>
                            <td>{creator.tugas.join(", ")}</td>
                        </tr>
                        <tr>
                            <td>Deskripsi:</td>
                            <td>{creator.deskripsi}</td>
                        </tr>
                    </table>
                </div>
            </div>
            )
        })

        return (
            <main>

            <div className="d-flex justify-content-center mb-2">
                <h2 style={{borderBottom: "5px solid"}}>About Us</h2>
            </div>

            <div className="row gap-4 mx-4">
                {creators}
            </div>
    
            <div className="d-flex justify-content-center my-2">
                <Link to="/" className="btn btn-success px-4">
                    Back
                </Link>
            </div>
            </main>
        );
    }
}

export default AboutUs;