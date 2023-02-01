class FluentBusinesses {
  // constructor(data: object[])
  constructor(data) {
    this.data = data;
  }

  // fromCityInState(city: string, state: string): FluentBusinesses
  fromCityInState(city, state) 
  {
    return (this.#filter("state", (s) => s === state)).#filter("city", (c) => c === city);
  }

  //helper for filter
  //contains(obj: object, field: string, f<T>: (T) => boolean)
  #check(obj, field, f)
  {
    if (!(field in obj))
    {
      return false;
    }
    if (!f(obj[field]))
    {
      return false;
    }
    return true;
  }

  //filters through a specific field
  ////filter(field: string, f<T>: (T) => boolean)
  #filter(field, f)
  {
    return new FluentBusinesses(this.data.filter(e => this.#check(e, field, f)));
  }

  //hasStarsGeq(stars: number): FluentBusinesses
  hasStarsGeq(stars)
  {
    return this.#filter("stars", (s) => s >= stars);
  }

  //inCategory(category: string): FluentBusinesses
  inCategory(category)
  {
    return this.#filter("categories", function(c) {
      if (!Array.isArray(c))
      {
        return false;
      }
      return c.includes(category);
    });
  }

  //isOpenOnDays(days: string[]): FluentBusinesses
  isOpenOnDays(days)
  {
    return days.length === 0 ? new FluentBusinesses(this.data) : this.#filter("hours", h => days.every(d => d in h));
  }

  //hasAmbience(ambience: string): FluentBusinesses
  hasAmbience(ambience)
  {
    return this.#filter("attributes", function(a) {
      if (!("Ambience" in a))
      {
        return false;
      }
      if (!(ambience in a.Ambience))
      {
        return false;
      }
      return a.Ambience[ambience] === true;
    });
  }

  //helper to get array of best option(s)
  //best(field: string): object[];
  #best(field)
  {
    let best = this.data.reduce((acc, e) => (e[field] >= acc ? e[field] : acc), -1);
    return this.#filter(field, (f) => f >= best);
  }

  //bestPlace(): object
  bestPlace()
  {
    let best = (this.#best("stars"));
    if (best.data.length === 0)
    {
      return {};
    }
    let first = best.data[0];
    best = best.#best("review_count");
    if (best.data.length === 0)
    {
      return first;
    }
    else
    {
      return best.data[0];
    }
  }

  //mostReviews(): object
  mostReviews()
  {
    let best = (this.#best("review_count"));
    if (best.data.length === 0)
    {
      return {};
    }
    let first = best.data[0];
    best = best.#best("stars");
    if (best.data.length === 0)
    {
      return first;
    }
    else
    {
      return best.data[0];
    }
  }

}

module.exports = FluentBusinesses;
