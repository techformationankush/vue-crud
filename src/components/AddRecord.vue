<template>
	<div class="col-md-12 p-0">
		<div class="col-sm-12 popup_wrapper mt-3" style="background: white;">
			<div class="popup_header_top mb-4 d-flex">
				<a
					href="javascript:;"
					@click="$router.push('/')"
					class="w-20 d-inline-block rounded-circle clr1 float-left position-absolute"
				>
					<i class="fas fa-arrow-left fnt-20"></i
				></a>
				<div class="fnt-18 float-left text-back mx-auto">Add Record</div>
			</div>
			<div class="clearfix"></div>
			<div class="pt-3 pb-4 mt-5 mb-3">
				<div class="row w-95 mx-auto mt-4">
					<div class="w-100 p-0" v-if="errors.length">
						<b>Please correct the following error(s):</b>
						<ul class="validations p-2">
							<li v-for="(error, index) in errors" :key="index">
								<div class="alert alert-danger">{{ error }}</div>
							</li>
						</ul>
					</div>
					<div class="col-md-12" @submit.prevent="submit" v-if="!submitted">
						<div class="form-group text-left">
							<label for="formGroupExampleInput"><strong>Title</strong></label>
							<input
								type="text"
								required
								v-model="record.title"
								class="form-control rounded-0 fnt-18"
							/>
						</div>
						<div class="form-group text-left">
							<label for="formGroupExampleInput"><strong>Description</strong></label>
							<input
								type="text"
								required
								v-model="record.desc"
								class="form-control rounded-0 fnt-18"
							/>
						</div>
					</div>
				</div>
			</div>
			<div class="mt-5" v-if="!submitted">
				<button
					@click="checkForm"
					type="button"
					class="btn btn-save w-80 fnt-16 mt-5"
				>
					save
				</button>
			</div>
		</div>
		<Menu></Menu>
	</div>
</template>

<script>
import DataService from "../components/Services/DataService";
import Menu from "./Menu";
import swal from "sweetalert";

export default {
	name: "AddRecord",
	data() {
		return {
			record: {
				id: null,
				title: "",
				desc: ""
			},
			errors: [],
			submitted: false
		};
	},
	components: {
		Menu
	},
	methods: {
		checkForm: function(e) {
			if (this.record.title && this.record.desc) {
				this.addRecord();
			}

			this.errors = [];

			if (!this.record.title) {
				this.errors.push("Title required.");
			}
			if (!this.record.desc) {
				this.errors.push("Description required.");
			}

			e.preventDefault();
		},
		addRecord() {
			var data = {
				title: this.record.title,
				desc: this.record.desc
			};

			DataService.create(data)
				.then(response => {
					this.record.id = response.data.id;
					console.log(response.data);
					this.submitted = true;

					swal("Record", "Added successfully!", "success").then(() => {
						this.$router.push({ name: "home", params: { submitted: true } });
					});
				})
				.catch(e => {
					swal({ text: "Not Able to add!", dangerMode: true });
					console.log(e);
				});
		},

		mounted() {
			console.log(this.$route.params);
		}
	}
};
</script>
