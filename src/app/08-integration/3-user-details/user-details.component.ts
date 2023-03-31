import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
	constructor(private router: Router, private route: ActivatedRoute) {}

	ngOnInit() {
		// comprueba que el usuario sea un usuario de la válido
		this.route.params.subscribe(p => {
			if (p['id'] === 0) {
				this.router.navigate(['not-found']);
			}
		});
	}

	save() {
		// si lo quitamos el primer test falla
		this.router.navigate(['users']);
	}
}
