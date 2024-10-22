function mapDtoToEntity<T, U>(dto: T, entityClass: {new (): U}): U {
    const entity = new entityClass();
    Object.keys(dto).forEach(key => {
        entity[key] = dto[key];
    })
    return entity;
}

export { mapDtoToEntity }

