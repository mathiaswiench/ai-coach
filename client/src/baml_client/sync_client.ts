/*************************************************************************************************

Welcome to Baml! To use this generated code, please run one of the following:

$ npm install @boundaryml/baml
$ yarn add @boundaryml/baml
$ pnpm add @boundaryml/baml

*************************************************************************************************/

// This file was generated by BAML: do not edit it. Instead, edit the BAML
// files and re-generate this code.
//
/* eslint-disable */
// tslint:disable
// @ts-nocheck
// biome-ignore format: autogenerated code
import { BamlRuntime, FunctionResult, BamlCtxManager, BamlSyncStream, Image, ClientRegistry, createBamlValidationError, BamlValidationError } from "@boundaryml/baml"
import { Checked, Check } from "./types"
import {Activity, Training, TrainingPlan, Week} from "./types"
import TypeBuilder from "./type_builder"
import { DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME } from "./globals"

export type RecursivePartialNull<T> = T extends object
  ? {
      [P in keyof T]?: RecursivePartialNull<T[P]>;
    }
  : T | null;

export class BamlSyncClient {
  private runtime: BamlRuntime
  private ctx_manager: BamlCtxManager

  constructor(private runtime: BamlRuntime, private ctx_manager: BamlCtxManager) {}

  /*
  * @deprecated NOT IMPLEMENTED as streaming must by async. We
  * are not providing an async version as we want to reserve the
  * right to provide a sync version in the future.
  */
  get stream() {
    throw new Error("stream is not available in BamlSyncClient. Use `import { b } from 'baml_client/async_client")
  }  

  
  TrainingPlanGenerator(
      training_data: string,
      __baml_options__?: { tb?: TypeBuilder, clientRegistry?: ClientRegistry }
  ): TrainingPlan {
    try {
    const raw = this.runtime.callFunctionSync(
      "TrainingPlanGenerator",
      {
        "training_data": training_data
      },
      this.ctx_manager.cloneContext(),
      __baml_options__?.tb?.__tb(),
      __baml_options__?.clientRegistry,
    )
    return raw.parsed() as TrainingPlan
    } catch (error: any) {
      const bamlError = createBamlValidationError(error);
      if (bamlError instanceof BamlValidationError) {
        throw bamlError;
      } else {
        throw error;
      }
    }
  }
  
}

export const b = new BamlSyncClient(DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_RUNTIME, DO_NOT_USE_DIRECTLY_UNLESS_YOU_KNOW_WHAT_YOURE_DOING_CTX)