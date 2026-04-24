import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  standalone: true,
})
class TopBarComponent {}

describe('TopBarComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopBarComponent],
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(TopBarComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display dashboard title', () => {
    const fixture = TestBed.createComponent(TopBarComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement as HTMLElement;

    expect(el.textContent).toContain('Tableau de bord');
  });

  it('should display admin name', () => {
    const fixture = TestBed.createComponent(TopBarComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement;

    expect(el.textContent).toContain('Admin');
  });

  it('should display admin role', () => {
    const fixture = TestBed.createComponent(TopBarComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement;

    expect(el.textContent).toContain('Administrateur');
  });

  it('should display avatar initials', () => {
    const fixture = TestBed.createComponent(TopBarComponent);
    fixture.detectChanges();

    const el = fixture.nativeElement;

    expect(el.textContent).toContain('AD');
  });

  it('should have a header element', () => {
    const fixture = TestBed.createComponent(TopBarComponent);
    fixture.detectChanges();

    const header = fixture.nativeElement.querySelector('header');

    expect(header).toBeTruthy();
  });
});
