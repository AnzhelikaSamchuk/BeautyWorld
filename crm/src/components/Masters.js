import { Master } from "./Master";

export function Masters({ masters }) {
	return masters.map((master) => <Master key={master.id} master={master} />);
}