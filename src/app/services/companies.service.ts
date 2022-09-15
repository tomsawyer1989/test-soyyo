import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class CompaniesService {
    private apiUrl: string = 'https://f56c0ao48b.execute-api.us-east-1.amazonaws.com/dev/entity/v2.1';

    constructor (private http: HttpClient) {}

    getCompanies(entityId: number) {
        const url = `${ this.apiUrl }/entities/${ entityId }`;
        
        return this.http.get<any>(url);
    }
}