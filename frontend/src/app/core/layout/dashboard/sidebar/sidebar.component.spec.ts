import { TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { provideRouter } from '@angular/router';

describe('SidebarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render EventHub brand', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Event');
    expect(el.textContent).toContain('Hub');
  });

  it('should have 3 navigation links', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a');

    expect(links.length).toBe(3);
  });

  it('should have correct routerLinks', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();

    const links = fixture.nativeElement.querySelectorAll('a');

    expect(links[0].getAttribute('routerLink')).toBe('/admin/events');
    expect(links[1].getAttribute('routerLink')).toBe('/admin/users');
    expect(links[2].getAttribute('routerLink')).toBe('/admin/reservations');
  });

  it('should display admin footer text', () => {
    const fixture = TestBed.createComponent(SidebarComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement;

    expect(el.textContent).toContain("Connecté en tant qu'Admin");
  });
});
