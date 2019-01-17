import Axios, { AxiosInstance } from "axios";
export class SeatsioClient {
    private PrivateKey: string;
    private EventKey: string;
    private client: AxiosInstance;
    /**
     *
     * @param privateKey {string} Seatsio private key.
     * @param eventKey {string} Seatsio event key.
     */
    constructor(privateKey: string, eventKey: string) {
        this.PrivateKey = privateKey;
        this.EventKey = eventKey;
        this.client = Axios.create({
            baseURL: "https://api.seatsio.net/",
            auth: {
                username: this.PrivateKey,
                password: ""
            }
        });
    }

    public Book(seat: string, fullName: string) {
        this.client.post(`/events/${this.EventKey}/actions/book`, {
            objects: [
                {
                    objectId: seat,
                    extraData: fullName
                }
            ]
        });
    }
}
