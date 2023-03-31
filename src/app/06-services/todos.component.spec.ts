import { TodosComponent } from './todos.component';
import { TodoService } from './todo.service';
import { EMPTY, of, throwError } from 'rxjs';

xdescribe('TodosComponent', () => {
	let component: TodosComponent;
	let service: TodoService;

	beforeEach(() => {
		service = new TodoService(null);
		component = new TodosComponent(service);
	});

	it('should set todos property with the items returned from the server', () => {
		const todos = [
			{ id: 1, title: 'a' },
			{ id: 2, title: 'b' },
			{ id: 3, title: 'c' }
		];
		spyOn(service, 'getTodos').and.callFake(() => {
			return of([JSON.stringify(todos)]);
		});

		component.ngOnInit();

		expect(component.todos).toBe(todos);
	});

	it('should call the server to save the changes when a new todo item is added', () => {
		const spy = spyOn(service, 'add').and.callFake(_ => {
			return of();
		});

		component.add();

		expect(spy).toHaveBeenCalled();
	});

	it('should add the new todo returned from the server', () => {
		const todo = { id: 1 };
		const spy = spyOn(service, 'add').and.callFake(_ => {
			return of(JSON.stringify(todo));
		});

		component.add();

		expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
	});

	it('should set the message property when server returns an error when adding a new todo', () => {
		const error = 'error from the server';
		const spy = spyOn(service, 'add').and.returnValue(throwError(error));

		component.add();

		expect(component.message).toBe(error);
	});

	it('should call the server to delete a todo item if the user confirms', () => {
		spyOn(window, 'confirm').and.returnValue(true);
		const spy = spyOn(service, 'delete').and.returnValue(EMPTY);

		component.delete(1);

		expect(spy).toHaveBeenCalledWith(1);
	});

	it('should NOT call the server to delete a todo item if the user cancels', () => {
		spyOn(window, 'confirm').and.returnValue(false);
		const spy = spyOn(service, 'delete').and.returnValue(EMPTY);

		component.delete(1);

		expect(spy).not.toHaveBeenCalled();
	});

	// xdescribe('Spy Matchers', () => {
	// 	it('toHaveBeenCalled', () => {
	// 		const spy = spyOn(service, 'getTodos').and.callThrough();
	// 		expect(spy).toHaveBeenCalled();
	// 	});
	// 	it('toHaveBeenCalledBefore', () => {
	// 		// 
	// 		const spy1 = spyOn(service, 'getTodos').and.callThrough();
	// 		const spy2 = spyOn(service, 'add').and.callThrough();
	// 		expect(spy1).toHaveBeenCalledBefore(spy2);
	// 	});
	// 	it('toHaveBeenCalledWith', () => {
	// 		const spy = spyOn(service, 'delete').and.callThrough();
	// 		expect(spy).toHaveBeenCalledWith(1);
	// 	});
	// 	it('toHaveBeenCalledOnceWith', () => {
	// 		const spy = spyOn(service, 'delete').and.callThrough();
	// 		expect(spy).toHaveBeenCalledOnceWith(2);
	// 	});
	// 	it('toHaveBeenCalledTimes', () => {
	// 		const spy = spyOn(service, 'delete').and.callThrough();
	// 		expect(spy).toHaveBeenCalledTimes(3);
	// 	});
	// 	it('spy', () => {
	// 		// Usos de los espías
	// 		spyOn(window, 'confirm').and.returnValue(false);

	// 		// ponemos el espía en el metodo y mantenemos su implementación
	// 		const spy1 = spyOn(service, 'delete').and.callThrough();
	// 		// reemplazamos la implementacion del metodo
	// 		const spy2 = spyOn(service, 'add').and.callFake(() => {return of(); });
	// 		// retornamos otro valor
	// 		const spy3 = spyOn(service, 'delete').and.returnValue(EMPTY);
	// 		// retornamos un error
	// 		const spy4 = spyOn(service, 'add').and.returnValue(throwError('error'));
	// 	});
	// });
});
