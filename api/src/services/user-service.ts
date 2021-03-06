import Knex, { Config } from "knex";

export class UserService {

    private knex: Knex;

    constructor(config: Config<any>) {
        this.knex = Knex(config);
    }

    isConnected(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.knex.raw("SELECT 'Connected' as [working]")
                .then((data: Array<any>) => {
                    if (data && data.length == 1) {
                        resolve(data[0].working === 'Connected')
                    }

                    resolve(false)
                })
                .catch(err => {
                    console.error(err)
                    resolve(false);
                })
        })
    }
}