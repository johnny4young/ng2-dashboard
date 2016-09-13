import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

const baseUrl = "https://api.github.com/repos/telerik/kendo-ui-core/issues";

@Injectable()
export class GithubService {
    private headers = new Headers({ 'Authorization': "token 16c3c038dcfbc6847f1e4e5547f29f6a7d953c63" });
    constructor(public http: Http) { }

    getGithubIssues(pages) {
        return Observable.forkJoin(this.getIssuesUrls(pages));
    }

    getIssuesUrls({ pages }) {
        const result = [];
        for (let index = 1; index < pages; index++) {
            result.push(
                this.http.get(`${baseUrl}?state=all&page=${index}&per_page=100`, { headers: this.headers })
                    .map(this.handleResponse)
            );
        }
        return result;
    }

    getGithubUser(username) {
        return this.http.get(`https://api.github.com/users/${username}`, { headers: this.headers })
            .map(this.handleResponse);
    }

    getGithubIssue(id: number) {
        return this.http.get(`${baseUrl}/${id}`, { headers: this.headers })
            .map(this.handleResponse);
    }

    handleResponse(res: Response): any {
        // console.log("----- Response -----");
        // console.log("res.url: " + res.url);
        // console.log("res.status: " + res.status);
        // console.log("res.json(): " + res.json());
        // console.log("----- Response End-----");
        return res.json();
    }
}