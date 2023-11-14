import { VoterComponent } from './voter.component';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('VoterComponent', () => {
	let component: VoterComponent;
	let fixture: ComponentFixture<VoterComponent>;

	beforeEach(() => {
		// 1) setup básico de integración

		// TestBed es la clase que utilizamos realizar pruebas en angular, separa nuestro componente de la applicación y le brinda un entorno de pruebas
		// la directiva ngModule conecta el componente al modulo de la applicacion de angular, podriamos decir que configureTestingModule hace lo mismo
		// pero en un entorno de pruebas (declarations, imports, providers)

		TestBed.configureTestingModule({
			declarations: [VoterComponent]
		}); // Esto nos crea un modulo de pruebas dinámico

		// componentFixture es un wrapper de nuestro componente, que tiene algunas utilidades de testing
		// createComponent devuelve un Generico: ComponenFixture en este caso de nuestro voterComponent

		fixture = TestBed.createComponent(VoterComponent);

		// componentInstance nos devuelve el objeto raiz del fixture

		component = fixture.componentInstance;

		// elemento html raiz del template del componente:
		fixture.nativeElement;

		// wrapper de nativeElement
		fixture.debugElement;

		// 2) podemos generar esto de manera automática con: > ng generate component
	});

	// Bindings

	// propiedades
	it('should render total votes', () => { 
		component.othersVote = 20;
		component.myVote = 1;
		// es necesario hacer detectChanges porque Angular no detecta automaticamente los cambios en el entorno de pruebas
		fixture.detectChanges();

		// buesco el elemento a parter de la clase css 
		const de = fixture.debugElement.query(By.css('.vote-count'));
		const el: HTMLElement = de.nativeElement;

		// necesitamos "el" debido a que tenemos que acceder a innerText que no está en debugElement
		// de no necesitar una propiedad del nativeElement podriamos utilizar "de"
		expect(el.innerText).toContain('21');
	});

	// clases css
	it('should highlight the upvote button if I have upvoted', () => { 
		// disparamos el evento que debe cumplir la condición
		// igualamos myVotes a 1 para que cambie el estado del botón
		component.myVote = 1;
		
		// chequeamos si hay cambios
		fixture.detectChanges();

		// creamos nuestro js wrapper del elemento html 
		const de = fixture.debugElement.query(By.css('.glyphicon-menu-up'));

		// en este caso probamos directamente con el debug element
		expect(de.classes['highlighted']).toBeTruthy();
	});

	// eventos
	it('should increase total votes when I click the upvote button', () => {
		// creamos el wrapper
		const button = fixture.debugElement.query(By.css('.glyphicon-menu-up'));
		
		// triggerEventHandler dispara el evento, recibe 2 parametros eventName y eventObj
		button.triggerEventHandler('click', null);

		// hacer component.upVote probaría la función del compoenente pero no la llamada desde el botón
		
		// podríamos probar también con el de la vista, en principio no haría falta
		// ya que estamos probando que esté correctamente bindeado
		expect(component.totalVotes).toBe(1);
	});
});
