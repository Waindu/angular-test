import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UserDetailsComponent } from './user-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

// creo un Stub, es el equivalente a un spy pero con funciones propias
// lo usamos como sustituto del router original
class RouterStub {
	navigate(params) {}
}

// tambien necesitamos otro stub para sustituir lo que ocurre en ngOnInit()
class ActivatedRouteStub implements Partial<ActivatedRoute> {
	private subject = new Subject(); // es un observable pero además tiene un metodo para poner un nuevo valor en el observable

	// params: Observable<any> = EMPTY;
	get params() {
		return this.subject.asObservable();
	}

	push(value) {
		this.subject.next(value);
	}
}

describe('UserDetailsComponent', () => {
	let component: UserDetailsComponent;
	let fixture: ComponentFixture<UserDetailsComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				declarations: [UserDetailsComponent],
				// acá podemos ver como sustituimos los routes por nuestros stubs, 
				// Angular creará una instancia de "useClass" cuando llamemos a "provide"
				providers: [ 
					{
						provide: Router,
						useClass: RouterStub
					},
					{
						provide: ActivatedRoute,
						useClass: ActivatedRouteStub
					}
				]
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(UserDetailsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	// probamos la navegación

	it('should redirect the user to the users page after saving', () => {
		// traemos router de test bed
		const router = TestBed.inject(Router);
		// se usa sin and porque esto ya es un fakeMethod, por lo que no necesitamos hacer fakeCall
		const spy = spyOn(router, 'navigate');

		component.save();

		// 'users' la pagina como está definida en el routes de angular
		expect(spy).toHaveBeenCalledWith(['users']);
	});

	it('should navigate the user to the not found page when an invalid user ID is passed', () => {
		const router = TestBed.inject(Router);
		const spy = spyOn(router, 'navigate');


		const route: ActivatedRouteStub = (<unknown>(
			TestBed.inject(ActivatedRoute)
		)) as ActivatedRouteStub;

		route.push({ id: 0 });

		// podriamos probar ['users'] para comprobar que falla y ver el valor de spy 
		expect(spy).toHaveBeenCalledWith(['not-found']);
	});
});
