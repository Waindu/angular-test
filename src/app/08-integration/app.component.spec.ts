import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(
		waitForAsync(() => {
			TestBed.configureTestingModule({
				imports: [RouterTestingModule.withRoutes([])],
				declarations: [AppComponent /*, NavComponent*/],
				// the fast way to pass directive/component existence/import check - NavComponent here, without import
				schemas: [NO_ERRORS_SCHEMA] 
				// NO_ERRORS_SCHEMA le dice a angular que ignore los elementos no reconocidos, lo hace para no agregar NavComponent en declarations
			}).compileComponents();
		})
	);

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should have a router outlet', () => {
		// esto chequea que exista la directiva <router-outlet></router-outlet> en app.component.html
		const de = fixture.debugElement.query(By.directive(RouterOutlet));

		expect(de).not.toBeNull();
	});
});
