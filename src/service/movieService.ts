import { Director } from "src/entity/director";
import { Movie } from "src/entity/movie";
import { Study } from "src/entity/study";
import { Service } from "./service";
import { Response } from "src/entity/response";
import { ObjectId } from "mongodb";

export class MovieService extends Service<Movie> {
  constructor() {
    super("movie");
  }

  async listStydies(_id: ObjectId): Promise<Array<Study> | undefined> {
    return new Promise<Array<Study> | undefined>((resolve, reject) => {
      fetch(`/.netlify/functions/study/byMovie/${_id}`, {
        headers: { "Content-Type": "application/json" },
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
      }).then((response) => response.json())
        .then((response: Response<Array<Study> | undefined>) => {
          if (response.status === 200) {
            resolve(response.body);
          } else {
            reject(response);
          }
        }).catch(error => {
          reject(new Response<any>(404, error.errorMessage, error));
        });
    });
  }
}
