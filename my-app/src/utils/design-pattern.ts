import { DesignPatternTypes, DesignPatterns } from "../enum/design-patterns";
import adapterModel from '../patterns/adapter.json';
import observerModel from '../patterns/observer.json';
import singletonModel from '../patterns/singleton.json';
import strategyModel from '../patterns/strategy.json';

export const getDesignPatternsByType = {
  [DesignPatternTypes.Behavioral]: [DesignPatterns.Observer, DesignPatterns.Strategy],
  [DesignPatternTypes.Creational]: [DesignPatterns.Singleton],
  [DesignPatternTypes.Structural]: [DesignPatterns.Adapter],
}

export const getDesignPatternModel = (designPattern: DesignPatterns): any => {
  switch(designPattern) {
    case (DesignPatterns.Adapter):
      return adapterModel;
    case (DesignPatterns.Observer):
      return observerModel;
    case (DesignPatterns.Singleton):
      return singletonModel;
    case (DesignPatterns.Strategy):
      return strategyModel;
  }
}