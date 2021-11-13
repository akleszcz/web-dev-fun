# NestJS overview

## Dependency injection
> Dependency injection, or DI, is a design pattern in which a class requests dependencies from external sources rather than creating them.

[Source](https://angular.io/guide/dependency-injection)

> Dependency Injection (DI) is a programming technique that makes a class independent of its dependencies. Creating objects directly within the class is inflexible because it commits the class to particular objects and makes it impossible to change the instantiation later independently from the class.

[Source](https://www.growin.com/blog/what-is-dependency-injection/)

An example controller without dependency injection pattern implemented: https://github.com/productioncoder/node-dependency-injection/blob/starter/controller/dev.js

The same controller with dependency injection: 
https://github.com/productioncoder/node-dependency-injection/blob/master/controller/dev.js

Watch [Dependency Injection in Node with awilix #1](https://youtu.be/TxxdqfhMUnI?t=383) for more details.

### IoC Container
> The Container creates an object of the specified class and also injects all the dependency objects through a constructor, a property, or a method at run time and disposes it at the appropriate time. This is done so that we don't have to create and manage objects manually.

[Source](https://www.growin.com/blog/what-is-dependency-injection/)

One of the advantages of using dependency injection is that we can easily replace dependencies with their mocks:
```typescript
const mockRegionServiceProvider = {
  provide: RegionService,
  useValue: {
    find: jest.fn().mockReturnValue(Promise.resolve(mockRegion)),
    findAll: jest.fn().mockReturnValue(Promise.resolve(mockRegions)),
  },
};
```
(though it is still possible go mock dependencies in tests, even if they're created directly in a class, e.g. with [`jest.mock`](https://jestjs.io/docs/manual-mocks#mocking-user-modules)).

## Dependency injection in NestJS

> Dependency injection is an inversion of control (IoC) technique wherein you delegate instantiation of dependencies to the IoC container (in our case, the NestJS runtime system), instead of doing it in your own code imperatively. 

[Source](https://docs.nestjs.com/fundamentals/custom-providers)

### Modules

> A module is a class annotated with a @Module() decorator. The @Module() decorator provides metadata that Nest makes use of to organize the application structure.

[Source](https://docs.nestjs.com/modules)

> Modules define groups of components like providers and controllers that fit together as a modular part of an overall application. They provide an execution context, or scope, for these components. For example, providers defined in a module are visible to other members of the module without the need to export them.

[Source](https://docs.nestjs.com/fundamentals/dynamic-modules)

### Different ways to import a module
- static module binding

Example:
```typescript
@Module({
  imports: [UsersModule],
  providers: [AuthService],
  exports: [AuthService],
})
```
[Source](https://docs.nestjs.com/fundamentals/dynamic-modules)

![Modules and services](../assets/modules-services.svg)

> With static module binding, there's no opportunity for the consuming module to influence how providers from the host module are configured.

[Source](https://docs.nestjs.com/fundamentals/dynamic-modules)

- dynamic modules

Example:
```typescript
@Module({
  imports: [ConfigModule.register({ folder: './config' })],
  controllers: [AppController],
  providers: [AppService],
})
```
[Source](https://docs.nestjs.com/fundamentals/dynamic-modules#module-configuration)

Note that the method for providing module's options [can have any arbitrary name, but by convention we should call it either `forRoot()` or `register()`](https://docs.nestjs.com/fundamentals/dynamic-modules#config-module-example).

Some modules allow options to be provided asynchronously and define a method called `forRootAsync` for this purpose, e.g. the [TypeOrmModule](https://docs.nestjs.com/techniques/database#async-configuration).

